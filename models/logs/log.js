const express = require("express");
const router = express.Router();
var {
    graphqlHTTP
} = require('express-graphql');
var {
    buildSchema
} = require('graphql')

// GraphQL schema
var schema = buildSchema(`
    type Log {
        _id: ID!
        title: String!
        author: String!
        description: String
        topic: String
    }
`);

var resolver = () => {
    const logFetch = LogData.find()
        return logFetch.map(log =>{
            return {
                ...log._doc,
                _id: log.id,
                url, log
            }
        })
}

var logData = [{
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]


var getLog = function (args) {
    var id = args.id;
    return logData.filter(log => {
        return log.id == id;
    })[0];
}
var getLogs = function (args) {
    if (args.topic) {
        var topic = args.topic;
        return logData.filter(log => log.topic === topic);
    } else {
        return coursesData;
    }
}

var root = {
    log: getLog,
    logs: getLogs
};




// router.use('/', graphqlHTTP({
//     schema,
//     rootValue: root,
//     graphiql: true,
//     csrfToken: csrfToken(),
// }));





module.exports = router;
