use actix_cors::Cors;
use actix_web::*;
use actix_web::{web, App, HttpServer};

#[macro_use]
extern crate serde_json;

#[macro_use]
extern crate lazy_static;

use crate::handlers::index;
use actix_files::Files;

mod error;
mod handlers;
mod iot_handler;
mod urls;

use crate::urls::url_config;

pub static HTTP_PORT: &'static str = ":1337";

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
  dotenv::dotenv().ok();
  std::env::set_var("RUST_LOG", "actix_web=info,actix_server=info");
  env_logger::init();

  HttpServer::new(move || {
    App::new()
      .wrap(Cors::new().finish())
      .wrap(middleware::Logger::default())
      .route("/", web::get().to(index))
      .service(web::scope("/api").configure(url_config))
      .service(Files::new("/", "./static"))
  })
  .bind("0.0.0.0".to_owned() + HTTP_PORT)?
  .run()
  .await
}
