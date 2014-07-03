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
        url_mobile: String,
        visitedCount: {
            type: Number,
            default: 0
        },
        votedBy: [String]
    }],
    lunchTime: {
        type: String // FIXME use Date type
    },
    administrator: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: 'vote' // There are 2 state. 'vote' or 'voted'
    },
    decidedShop: String
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
    Group.update({'members.id': memberId, '_id': groupId, 'shops.id': shopId},
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
    Group.update({'members.id': memberId, '_id': groupId, 'shops.id': shopId},
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

groupSchema.statics.setDecidedShop = function(group, decidedShop, completed) {
    group.decidedShop = decidedShop;
    group.state = 'voted';
    group.save(function(err, group) {
            if (err) cosole.log(err);
            completed(err, group);
    });
}

groupSchema.statics.visited = function(group, completed) {
    for(var i=0, len=group.shops.length; i<len; i++){
        var shop = group.shops[i];
        if (shop.id === group.decidedShop) {
            shop.visitedCount += 1;
        }
        shop.votedBy = [];
    }
    group.state = 'vote';
    group.save(function(err, group) {
            if (err) cosole.log(err);
            completed(err, group);
    });
}

groupSchema.statics.updateGroupByJSON = function(group, completed) {
    if (!group._id) {
        Group.createGroup(group, completed);
    } else {
        Group.update({"_id": group._id}, group, {upsert: true}, function(err) {
            if (err) console.log(err);
            if (completed) {
                completed(err);
            }
        });
    }
};

groupSchema.statics.createGroup = function(group, completed) {
    Group.create({
        'name': group.name,
        'members': group.members,
        'shops': group.shops,
        'administrator': group.administrator,
        'state':'vote'
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
