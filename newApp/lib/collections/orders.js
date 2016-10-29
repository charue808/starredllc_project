// Sample orders:
//
// Given the following catalog entries:
// book1 = {copyright:"2015", interestLvl:"PreK to 3", isbn:"978-1-4914-8773-0", ..., title:"PebbleGo Science + Biographies + Social Studies + Dinosaurs New", yourPrice:"$995.00"}
// book2 = {copyright:"2015", interestLvl:"PreK to 3", isbn:"978-1-9888-8773-0", ..., title:"Yo momz", yourPrice:"$19,995.00"}
// book3 = {copyright:"2016", interestLvl:"PreK to 3", isbn:"433-1-9888-8773-0", ..., title:"Hello, can you hear me?", yourPrice:"$9,995.00"}
//
// An order would take the following form:
// capstoneOrder = {publisherId: "capstone", orderId: "9u823hof9y32", orderDetails:[{isbn:'978-1-4914-8773-0', qty:2}, {isbn:'433-1-9888-8773-0', qty:12}]}
// lernerOrder = {publisherId: "lerner", orderId: "8p82382h9y32", orderDetails:[{isbn:'787-1-4914-8773-0', qty:6}]}