// CRUD create read update delete

const {MongoClient, ObjectId} = require('mongodb')



const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'simple-crud'

//const id = new ObjectId();
//console.log(id);


MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

	// CREATE with callback
		
		db.collection('users').insertOne({
		    name: 'Miya',
		    age: 26
		},(err, result) =>{
			if(err){
				return console.log('Unable to insertOne data')
			}
			return console.log('CREATE ONE',result.ops)
		})


		db.collection('users').insertMany([
				{name: 'Hanabi', age:26},
				{name: 'Miya', age: 25}
			],(err,result)=>{
				if(err){
					return console.log('Unable to insertOne data')
				}
				return console.log('CREATE MANY',result.ops)
			})


/*----------------------------------*/
	// READ with promise

		db.collection('users')
			.findOne({name: 'Miya'})
			.then(user => console.log('READ ONE',user))
			.catch(err => console.log(err))


		db.collection('users')
			.find({age: 26})
			.toArray()
			.then(users => console.log('READ MANY',users))
			.catch(err => console.log(err))


/*----------------------------------*/
	// UPDATE with promise

		// {$rename:{age: 'umur'}}
		// {$inc:{umur: -1}}
		// {$unset:{age:1}}

		db.collection('users')
		    .updateOne({name: 'Miya'}, {$set:{umur:29}})
		    .then(result => console.log('UPDATE ONE',result.result))
		    .catch(err => console.log(err));


		db.collection('users')
		    .updateMany({name: 'Miya'},{$set:{age: 25}})
		    .then(result => console.log('UPDATE MANY',result.result))
		    .catch(err => console.log(err));


/*----------------------------------*/
	// DELETE with promise

		db.collection('users')
		    .deleteOne({name:'Hanabi'})
		    .then(result => console.log('DELETE ONE',result.result))
		    .catch(err => console.log(err));


		db.collection('users')
		    .deleteMany({age:25})
		    .then(result => console.log('DELETE MANY',result.result))
		    .catch(err => console.log(err));

});
