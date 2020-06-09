const { Builder, By, Key, until } = require( 'selenium-webdriver' );
const chrome = require( 'selenium-webdriver/chrome' );
const chromedriver = require( 'chromedriver' );

chrome.setDefaultService( new chrome.ServiceBuilder( chromedriver.path ).build() );

module.exports.amazonIPhoneXScraper = async function() {
  // var capabilities = {
  //   'browserName' : 'Safari',
  //   'browser_version' : '13.0',
  //   'os' : 'OS X',
  //   'os_version' : 'Catalina',
  //   'resolution' : '1920x1080',
  //   'browserstack.user' : '',
  //   'browserstack.key' : '',
  //   'name' : 'SE onboard Selenium Webcrawler',
  //   'browserstack.console' : 'verbose',
  // }

  let driver = await new Builder().
    usingServer('http://hub-cloud.browserstack.com/wd/hub').
    withCapabilities(capabilities).
    build();

  const delay = timeToWait => new Promise(resolve => setTimeout(resolve, timeToWait));

  try {
    await driver.get( 'http://www.amazon.com' );
    await driver.findElement( By.id( 'twotabsearchtextbox' ) ).sendKeys( 'iPhone X', Key.RETURN );
    await driver.wait( until.elementLocated( By.xpath( '//*[@id="p_n_feature_twenty_browse-bin/17881878011"]/span/a/div/label/i' ) ) );
    await ( await driver.findElement( By.xpath( '//*[@id="p_n_feature_twenty_browse-bin/17881878011"]/span/a/div/label/i' ) ) ).click();
    await driver.wait( until.elementLocated( By.xpath( '//*[@id="a-autoid-0-announce"]' ) ) );
    await ( await driver.findElement( By.xpath( '//*[@id="a-autoid-0-announce"]' ) ) ).click();
    await driver.wait( until.elementLocated( By.linkText( 'Price: High to Low' ) ) );
    await ( await driver.findElement( By.linkText( 'Price: High to Low' ) ) ).click();
    await ( await driver.findElements( By.className( 's-include-content-margin' ) ) ).forEach( ( ele ) => {
      ele.findElements( By.className( 'a-size-medium' ) ).then( ( eleArray ) => {
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
  }
  catch ( err ) {
    console.log( err );
  }
  finally {
    await delay( 3 * 1000 );
    await driver.quit();
  }
};

this.amazonIPhoneXScraper();