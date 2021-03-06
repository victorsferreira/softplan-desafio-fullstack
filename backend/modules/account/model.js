const Mongoose = require('mongoose');
const MongooseSchema = Mongoose.Schema;

class AccountModel {
    constructor() {
        const schema = new MongooseSchema({ email: 'string', type: 'string', password: 'string' });
        this.db = Mongoose.model('Account', schema);
    }

    create(data) {
        return this.db.create(data);
    }

    edit(id, data, options) {
        if (!options) options = { new: true };
        return this.db.findOneAndUpdate({ _id: id }, { $set: data }, options);
    }

    remove(id, returnBoolean = true) {
        return this.db.deleteOne({ _id: id })
            .then((result) => {
                if (returnBoolean) return this.returnBoolean(result);
                return result;
            });
    }

    findById(id) {
        return this.db.findOne({ _id: id });
    }

    search(criteria = {}) {
        return this.db.find(criteria);
    }

    returnBoolean(result) {
        const nModified = 'nModified' in result ? result.nModified : true;
        return result.ok > 0 && result.n > 0 && nModified;
    }
}

module.exports = new AccountModel();