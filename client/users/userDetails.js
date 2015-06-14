Template.userDetails.helpers({
  userEmail: function() {
    return this.emails[0].address;
  },
  userAdmin: function() {
    if (this.profile.role === "admin") {
      return "Y";
    } else {
      return "";
    }
  }
});
