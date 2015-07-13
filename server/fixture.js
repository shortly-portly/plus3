if ( Meteor.users.find().count() === 0 ) {
  console.log("creating blanche");
    var id = Accounts.createUser({
        username: 'blanche',
        email: 'blanche@email.com',
        password: 'blanche',
        profile: {
            firstName: 'Blanche',
            surname: 'Simmons',
            role: "admin",
            status: "active"
        }


    });

}
