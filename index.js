const { Builder, By, Key, until } = require( 'selenium-webdriver' );
const chrome = require( 'selenium-webdriver/chrome' );
const chromedriver = require( 'chromedriver' );

chrome.setDefaultService( new chrome.ServiceBuilder( chromedriver.path ).build() );

(async function seleniumIntro() {
  let driver = await new Builder().forBrowser( 'chrome' ).build();

  try {
    await driver.get( 'http://www.amazon.com' );
    await driver.findElement( By.id( 'twotabsearchtextbox' ) ).sendKeys( 'iPhone X', Key.RETURN );
    await ( await driver.findElement( By.xpath( '//*[@id="p_n_feature_twenty_browse-bin/17881878011"]/span/a/div/label/i' ) ) ).click();
    await driver.wait( until.elementLocated( By.xpath( '//*[@id="a-autoid-0-announce"]' ) ) );
    await ( await driver.findElement( By.xpath( '//*[@id="a-autoid-0-announce"]' ) ) ).click();
    await ( await driver.findElement( By.linkText( 'Price: High to Low' ) ) ).click();
    await ( await driver.findElements( By.className( 's-include-content-margin' ) ) ).forEach( ( ele ) => {
      ele.findElements( By.className( 'a-size-medium' ) ).then( (eleArray ) => {
        if ( eleArray.length ) {
          eleArray[0].getText()
            .then( text => console.log( 'Title: ' + text ) )
            .catch( err => console.log( err ));
        }
      });
      ele.findElements( By.className( 'a-price-whole' ) ).then( ( eleArray ) => {
        if ( eleArray.length ) {
          eleArray[0].getText()
            .then( text => console.log( 'Price: $' + text ) )
            .catch( err => console.log( err ));
        }
      });
      ele.findElements( By.tagName( 'a' ) ).then( ( eleArray ) => {
        if ( eleArray.length ) {
          eleArray[0].getAttribute( 'href' )
            .then( text => console.log( 'Link to Product: ' + text + '\n' ) )
            .catch( err => console.log( err ));
        }
      });
    });
    // await driver.wait( until.titleIs( 'Amazon.com : iPhone X' ), 10000 );
    // await driver.quit();
  }
  catch ( err ) {
    console.log( err );
  }
  // finally {
  //   await driver.close();
  // }
})();

// how to handle error
// try catch or findelements and if else block