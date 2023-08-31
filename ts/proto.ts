interface Strategy {
  authenticate(id: string): void;
}

Strategy.prototype.authenticate = function (id: string) {
  console.log("***", id);
};
