extern crate actix_web;

use actix_web::*;
use actix_web::{web, App, HttpServer};
use crate::urls::tf_urls_config;

#[macro_use]
extern crate serde_json;

#[macro_use]
extern crate lazy_static;

use actix_files::Files;
use crate::handlers::{index, test_handler};

mod urls;
mod handlers;
mod iot_handler;
mod error;

pub static HTTP_PORT: &'static str = ":8080";

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();
    std::env::set_var("RUST_LOG", "actix_web=info,actix_server=info");
    env_logger::init();

    HttpServer::new(move || {
        App::new()
            .wrap(middleware::Logger::default())
            .service(web::resource("/").route(web::get().to(index)))
            .service(
                web::scope("/api")
                    .configure(tf_urls_config)
            )
            .service(Files::new("/", "./static"))
            .service(web::resource("/test").route(web::post().to(test_handler)))
    })
        .bind("0.0.0.0".to_owned() + HTTP_PORT)?
        .run()
        .await
}