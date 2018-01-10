var {GraphQLSchema,GraphQLObjectType,GraphQLString,GraphQLList} = require('graphql');
var fetch = require('node-fetch');

var BASE_URL = 'https://swapi.co/api/people/';

var PeopleType = new GraphQLObjectType({
    name:'people',
    description:'.....',

    fields:() => ({
        name:{
            type:GraphQLString,
            resolve:(people) => people.name,
        }
    })
});

var FilmType = new GraphQLObjectType({
    name:'films',
    description:'Name of the Film',

    fields:() => ({
        title:{ type: GraphQLString,
        description: 'Title of the Film',}
    })
});

var QueryType = new GraphQLObjectType({
    name:'Query',
    description:'.....',

    fields:() =>({
        people:{
            type:PeopleType,
            args:{id:{type: GraphQLString}},
        resolve:(root, args) => 
            fetch('https://swapi.co/api/people/'+args.id)
            .then(res=>res.json())
        }
    })
});

module.exports =  new GraphQLSchema({
    query:QueryType,
})