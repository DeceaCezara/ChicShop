module.exports = ({ content }) => {
    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Shop</title>
          
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
          <link href="/css/main.css" rel="stylesheet">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.5/css/bulma.min.css"></link>
        </head>
  
        <body>
          <header>
            <nav class="navbar navbar-top">
              <div class="container navbar-container">
                <div>
                  <ul class="social">
                    <li>
                      <a href=""><i class="fa fa-phone"></i>0753389542</a>
                    </li>
                    <li>
                      <a href=""><i class="fa fa-envelope"></i> deceacezara2003@gmail.com</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <nav class="navbar navbar-bottom">
              <div class="container navbar-container">
                <div>
                  <a href="/">
                    <h3 class="title">Chic Shop</h3>
                  </a>
                </div>
                <div class="navbar-item">
                  <div class="navbar-buttons">
                    <div class="navbar-item">
                      <a href="/"><i class="fa fa-star"></i> Products</a>
                    </div>
                    <div class="navbar-item">
                      <a href="/cart"><i class="fa fa-shopping-cart"></i> Cart</a>
                    </div>
                    <div class="navbar-item">
                      <a href="/signin"><i class="fa-solid fa-right-to-bracket"></i> Sign In</a>
                    </div>
                    <div class="navbar-item">
                      <a href="/signout"><i class="fa-solid fa-right-to-bracket"></i> Sign Out</a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
  
          ${content}
        </body>
      </html>
    `;
  };
  