//  handles requests 
const index = (reg, res) => {
    res.render('index', {title: 'Travlr Getaways'});
}
module.exports = {
    index
}