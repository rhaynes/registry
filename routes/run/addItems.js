
var sql = require('fusion/sql');

function item(title,category,price,image) {
  price = +price.slice(1).split('.')[0];
  sql.query('INSERT INTO items(Title,Category,Price,Image) VALUES(:)',[title,category,price,image]);
}

exports.main = function() {
  item('Flights','Honeymoon: Flights and Lodging','$1200.00','http://www.caribbeannewsdigital.com/en/sites/default/files/en/imagenes_noticias/inselair.jpg')
  item('Hotel','Honeymoon: Flights and Lodging','$2400.00','http://images.trvl-media.com/hotels/10000000/9230000/9227400/9227396/9227396_45_z.jpg')
  item('Diving Courses','Honeymoon: Activities','$850.00','https://www.bookyourdive.com/uploads/listing/photo/image/5232fe5903b1db67e8000397/full_phoca_thumb_l_Diving_Belmar_Oceanfront_Apartments_House_Reef.jpg')
  item('Fluorescence Night Diving','Honeymoon: Activities','$150.00','http://www.diverwire.com/wp-content/uploads/2012/01/UV-picture.jpg')
  item('Romantic Torch-lit Dinner for Two','Honeymoon: Restaurants','$230.00','http://media-cdn.tripadvisor.com/media/photo-s/06/b1/85/6d/harbour-village-beach.jpg')
  item('Sailing to Klein Bonaire','Honeymoon: Activities','$150.00','http://www.compassbonaire.com/wp-content/uploads/2012/03/snorkel-and-sail-trip-bonaire.jpg')
  item('Hiking in Washington-Slagbaai National Park','Honeymoon: Activities','$50.00','/images/park.jpg')
  item('Sea Kayaking through Mangroves','Honeymoon: Activities','$90.00','http://www.mangrovesurfapartment.com/images/bonaire/mangrove-information.jpg')
  item('Visit to Flamingo Sanctuary','Honeymoon: Activities','$50.00','https://thebonaireblogger.files.wordpress.com/2012/03/00-salina-mathijs1.jpg')
  item('Cactus Drinks at Cadushy Distillary','Honeymoon: Restaurants','$50.00','http://cdn2.bigcommerce.com/n-63unu/gbih1x/product_images/uploaded_images/cadushy-600.gif?t=1411075292')
  item('Go Pro Camera','General Travel','$400.00','http://demandware.edgesuite.net/sits_pod15/dw/image/v2/AASJ_PRD/on/demandware.static/Sites-GoPro-Site/Sites-gopro-products/default/dw926a3f1e/hi-res/CHDHY-401_main1.jpg')
  item('Wild Donkey Sanctuary','Honeymoon: Activities','$20.00','http://www.aluxurytravelblog.com/wp-content/uploads/2014/10/Bonaire-donkeys_48503284.jpg')
  item('TUMI suitecase','General Travel','$400.00','http://mikeshouts.com/wp-content/uploads/2013/02/TUMI-Tegra-Lite-Continental-Carry-on-Luggage-Indigo-1.jpg')

  item('Cuissinart Mixer','Kitchen','$200.00','/images/cuissinart.jpg')
  item('Breville Barista Express','Kitchen','$600.00','/images/espresso.jpg')
  item('Lac Baai','Honeymoon: Restaurants','$50.00','/images/lac-baai.jpg')
  item('Little Havana','Honeymoon: Restaurants','$75.00','/images/little-havana.jpg')
  item('Osaka Sushi Bar','Honeymoon: Restaurants','$75.00','/images/osaka-sushi-bar.jpg')
  item('Phillips Cooking','Honeymoon: Restaurants','$50.00','/images/phillipscooking.jpg')
  item('Donna & Giorgio','Honeymoon: Restaurants','$50.00','/images/photo0jpg.jpg')
}

