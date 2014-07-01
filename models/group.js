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
    Group.update({'members.id': memberId, '_id': groupId, 'shops.id': shopId}, {$addToSet: {'shops.$.votedBy': memberId}}, {}, function(err, num, raw) {
        if (err) console.log(err);
        if (completed) {
            completed(err);
        }
    });
}

groupSchema.statics.unvote = function(memberId, groupId, shopId, completed) {
    Group.update({'members.id': memberId, '_id': groupId, 'shops.id': shopId}, {$pull: {'shops.$.votedBy': memberId}}, {}, function(err, num, raw) {
        if (err) console.log(err);
        if (completed) {
            completed(err);
        }
    });
}

groupSchema.statics.setDecidedShop = function(memberId, groupId, decidedShop, completed) {
    Group.update({'_id': groupId, 'members.id': memberId }, {'decidedShop':decidedShop, 'state':'voted'}, {}, function(err, num, raw) {
        if (err) console.log(err);
        if (completed) {
            completed(err);
        }
    });
}

groupSchema.statics.visited = function(memberId, groupId, completed) {
    Group.findOne({'_id': groupId, 'members.id':memberId }, function(err, group) {
        for(var i=0, len=group.shops.length; i<len; i++){
            var shop = group.shops[i];
            if (shop.id === group.decidedShop) {
                shop.visitedCount += 1;
            }
            shop.votedBy = [];
        }
        group.decidedShop = '';
        group.state = 'vote';
        group.save(completed);
    });
}

groupSchema.statics.updateGroup = function(group, completed) {
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
    var group = new Group({
        'name': group.name,
        'members': group.members,
        'shops': group.shops,
        'administrator': group.administrator,
        'state':'vote'
    });
    group.save(completed);
    return group;
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
