var mongoose = require('mongoose');

var groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [{
        id: {
            type: String,
            index: true
        },
        name: String
    }],
    shops: [{
        id: {
            type: String,
            index: true
        },
        name: String,
        category: String,
        address: String,
        tel: String,
        imageURL: String,
        url: String,
        url_mobile: String,
        visitedCount: {
            type: Number,
            default: 0
        },
        votedBy: [String],
        en_gid: String
    }],
    lunchTime: String,
    timezone: String,
    administrator: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: 'vote' // There are 2 state. 'vote' or 'voted'
    },
    decidedShop: String,
    evernote: [{
        userId: {
            type: String,
            index: true
        },
        guid: String,
        accessToken: String
    }]
});

groupSchema.statics.findByMemberId = function(id, completed) {
    Group.find({'members.id': id}).exec(completed);
};

groupSchema.statics.findByGroupId = function(memberId, groupId, completed) {
    Group.find({'members.id': memberId, '_id': groupId}).exec(completed);
}

groupSchema.statics.findOneByGroupId = function(memberId, groupId, completed) {
    Group.findOne({'members.id': memberId, '_id': groupId}, completed);
}

groupSchema.statics.vote = function(memberId, groupId, shopId, completed) {
    Group.update({'members.id': memberId, '_id': groupId, 'state':'vote', 'shops.id': shopId},
        {$addToSet: {'shops.$.votedBy': memberId}},
        {},
        function(err, num, raw) {
            if (err) console.log(err);
            if (completed) {
                completed(err);
            }
        }
    );
}

groupSchema.statics.unvote = function(memberId, groupId, shopId, completed) {
    Group.update({'members.id': memberId, '_id': groupId, 'state':'vote', 'shops.id': shopId},
        {$pull: {'shops.$.votedBy': memberId}},
        {},
        function(err, num, raw) {
            if (err) console.log(err);
            if (completed) {
                completed(err);
            }
        }
    );
}

groupSchema.statics.changeStateIfRequired = function(group, expectedState, calcDecidedShop, completed) {
    if (expectedState == "voted" && !group.decidedShop){

        // first access for vote result time and set decidedShop entry
        var decidedShop = calcDecidedShop(group);

        group.decidedShop = decidedShop;
        group.state = 'voted';
        save(group, completed);
    } else if(expectedState == "vote" && group.decidedShop){

        incrementVisited(group, decidedShop);

        group.decidedShop = '';
        group.state = 'vote';
        save(group, completed);
    } else {
        if (completed) {
            completed();
        }
    }
}

var save = function(group, completed) {
    group.save(function(err, group) {
        if (err) cosole.log(err);
        if (completed) {
            completed(err, group);
        }
    });
}

// increment visitedCount and clear votedBy
var incrementVisited = function(group, decidedShop) {
    // first access for voting time, reset will clear decidedShop entry
    for(var i=0, len=group.shops.length; i<len; i++){
        var shop = group.shops[i];
        if (shop.id === group.decidedShop) {
            shop.visitedCount += 1;
        }
        shop.votedBy = [];
    }
}

groupSchema.statics.updateGroupByJSON = function(userId, group, completed) {
    if (!group._id) {
        Group.createGroup(userId, group, completed);
    } else {
        Group.update({'members.id': userId, '_id': group._id}, group, {upsert: true}, function(err) {
            if (err) console.log(err);
            if (completed) {
                completed(err);
            }
        });
    }
};

groupSchema.statics.createGroup = function(adminId, group, completed) {
    Group.create({
        'name': group.name,
        'members': group.members,
        'shops': group.shops,
        'administrator': adminId,
        'state':'vote',
        'lunchTime':'12:00',
        'timezone':'Asia/Tokyo'
    }, completed);
}

groupSchema.statics.removeGroup = function(adminId, groupId, completed) {
    Group.remove({'_id':groupId, 'administrator':adminId}, function(err, num) {
        if (err) console.log(err);
        if (completed) {
            completed(err);
        }
    });
}

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
