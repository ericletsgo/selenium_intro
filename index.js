const { Builder, By, Key, until } = require( 'selenium-webdriver' );
const chrome = require( 'selenium-webdriver/chrome' );
const chromedriver = require( 'chromedriver' );

chrome.setDefaultService( new chrome.ServiceBuilder( chromedriver.path ).build() );

(async function seleniumIntro() {
  let driver = await new Builder().forBrowser( 'chrome' ).build();

  try {
    await driver.get( 'http://www.amazon.com' );
    await driver.findElement( By.id( 'twotabsearchtextbox' ) ).sendKeys( 'iPhone X', Key.RETURN );
    await ( await ( await driver.findElement( By.id( 'filters') ) )
        .findElement( By.id( 'p_n_feature_twenty_browse-bin/17881878011' ) ) )
        .findElement( By.className( 'a-icon-checkbox' ) )
        .click();
    await ( await driver.findElement( By.className( 'a-button-text' ) ) ).click();
    await ( await driver.findElement( By.linkText( 'Price: High to Low' ) ) ).click();
    await ( await driver.findElements( By.className( 's-include-content-margin' ) ) ).forEach( ( ele ) => {
        ele.findElement( By.className( 'a-size-medium' ) ).getText()
          .then( text => console.log( 'Title: ' + text ) )
          .catch( err => console.log( err ));
        ele.findElement( By.className( 'a-price-whole' ) ).getText()
          .then( text => console.log( 'Price: $' + text ) )
          .catch( err => console.log( err ));
        ele.findElement( By.tagName( 'a' ) ).getAttribute( 'href' )
          .then( text => console.log( 'Link to Product: ' + text + '\n' ) )
          .catch( err => console.log( err ));
    }).then( driver.quit() );
  } finally {
    // await Promise.all( driver.quit() );
  }
})();

// how to handle error
// try catch or findelements and if else block