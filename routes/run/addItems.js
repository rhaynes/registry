
var sql = require('fusion/sql');

function item(title,price,image) {
  price = +price.slice(1).split('.')[0];
  sql.query('INSERT INTO items(Title,Price,Image) VALUES(:)',[title,price,image]);
}

exports.main = function() {
  item('Flights','$1200.00','http://www.caribbeannewsdigital.com/en/sites/default/files/en/imagenes_noticias/inselair.jpg')
  item('Hotel','$2400.00','http://images.trvl-media.com/hotels/10000000/9230000/9227400/9227396/9227396_45_z.jpg')
  item('Diving Courses','$850.00','https://www.bookyourdive.com/uploads/listing/photo/image/5232fe5903b1db67e8000397/full_phoca_thumb_l_Diving_Belmar_Oceanfront_Apartments_House_Reef.jpg')
  item('Fluorescence Night Diving','$70.00','http://www.diverwire.com/wp-content/uploads/2012/01/UV-picture.jpg')
  item('Windsurfing Lessons','$160.00','http://www.delmarvaboardsportadventures.com/wp-content/uploads/2012/11/phpBfoAAVAM.jpg')
  item('Romantic Torch-lit Dinner for Two','$230.00','http://media-cdn.tripadvisor.com/media/photo-s/06/b1/85/6d/harbour-village-beach.jpg')
  item('Sailing to Klein Bonaire','$150.00','http://www.compassbonaire.com/wp-content/uploads/2012/03/snorkel-and-sail-trip-bonaire.jpg')
  item('Hiking in Washington-Slagbaai National park','$50.00','http://www.bonaireinsider.com/images/20120208-Hiking_Lagadishi1.jpg')
  item('Sea Kayaking through Mangroves','$90.00','http://www.mangrovesurfapartment.com/images/bonaire/mangrove-information.jpg')
  item('Visit to Flamingo Sanctuary','$50.00','https://thebonaireblogger.files.wordpress.com/2012/03/00-salina-mathijs1.jpg')
  item('Cactus Drinks at Cadushy Distillary','$50.00','http://cdn2.bigcommerce.com/n-63unu/gbih1x/product_images/uploaded_images/cadushy-600.gif?t=1411075292')
  item('Go Pro Camera','$400.00','http://demandware.edgesuite.net/sits_pod15/dw/image/v2/AASJ_PRD/on/demandware.static/Sites-GoPro-Site/Sites-gopro-products/default/dw926a3f1e/hi-res/CHDHY-401_main1.jpg')
  item('Wild Donkey Sanctuary','$20.00','http://www.aluxurytravelblog.com/wp-content/uploads/2014/10/Bonaire-donkeys_48503284.jpg')
  item('TUMI suitecase','$400.00','http://mikeshouts.com/wp-content/uploads/2013/02/TUMI-Tegra-Lite-Continental-Carry-on-Luggage-Indigo-1.jpg')
}

