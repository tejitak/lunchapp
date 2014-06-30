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
        id: String,
        name: String,
        category: String,
        address: String,
        tel: String,
        imageURL: String,
        url_mobile: String,
        visitedCount: Number,
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
    Group.find({'members.id':id}).exec(completed);
};

groupSchema.statics.findOneByGroupId = function(memberId, groupId, completed) {
    Group.findOne({'members.id':memberId, '_id':groupId}, completed);
}

groupSchema.statics.vote = function(memberId, groupId, shopId, completed) {
    Group.update({"_id": groupId, "shops.id": shopId}, {$addToSet: {"shops.$.votedBy": memberId}}, {}, function(err, num, raw) {
        completed(err);
    });
}

groupSchema.statics.updateGroup = function(group, completed) {
    group.save(completed);
    return group;
};

groupSchema.statics.createGroup = function(group, completed) {
    var group = new Group({'name':group.name, 'members':group.members, 'shops':group.shops, 'administrator':group.administrator});
    group.save(completed);
    return group;
}

var Group = mongoose.model('Group', groupSchema);

module.exports = Group;
