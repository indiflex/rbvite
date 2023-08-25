require("@babel/core").transformSync("code", {
  plugins: [["@babel/plugin-proposal-decorators", { version: "2023-05" }]],
});

function readonly(target, property, descriptor) {
  //Make it readonly (non-writable) on the descriptor
  descriptor.writable = false;
  return descriptor;
}

class User {
  constructor(lastName, firstName) {
    this.lastName = lastName;
    this.firstName = firstName;
  }

  @readonly
  getFullName() {
    return this.lastName + " " + this.firstName;
  }
}
