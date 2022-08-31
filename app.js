const message = `
Staytus test...


Thank you for reviewing my application...\n
But I need to mention these points:
    * You did not provide any "UI design file" with this test and provided images instead, so it will be very difficult for me to get the correct dimensions, pallets ...
    * In test description, I did not quite understand what do you mean by "if you can change the icon for the population computed for two digits".

Thank you again and I am looking forward for your feedback.


Bashar Ghazala
bashar.ghzalah@gmail.com
+971568058043

If browser did not started automatically please open this link manually: http://localhost:5000
`;

const express = require("express");
const open = require("open");
const app = express();
app.use(express.static("./public"));
app.listen(5000, async () => {
  console.log(message);
  await open("http://localhost:5000");
});
