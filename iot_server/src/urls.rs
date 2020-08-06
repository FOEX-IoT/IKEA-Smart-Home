use actix_web::web;
use crate::handlers::{on, off, setb};

pub fn url_config(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::resource("/setb/{val}").route(web::post().to(setb))
    );
    cfg.service(
        web::resource("/on").route(web::post().to(on))
    );
    cfg.service(
        web::resource("/off").route(web::post().to(off))
    );
}