class IssuedBook {
   _id;
   name;
   author;
   genre;
   price;
   publisher;
   issuedBy;
   issuedDate;
   returnDate;

   constructor(user) {
    this.id = user.IssuedBook._id;
    this.name = user.IssuedBook.name;
    this.genre = user.IssuedBook.genre;
    this.price = user.IssuedBook.price;
    this.publisher =  user.IssuedBook.publisher;
    this.issuedBy = user.name;
    this.issuedDate = user.issuedDate;
    this.returnDate = user.returnDate;
    
   }

}