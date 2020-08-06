use actix_web::{HttpResponse, web};
use crate::iot_handler::IOTHandler;
use actix_files::NamedFile;
use crate::error::ServiceError;

pub async fn on() -> Result<HttpResponse, ServiceError> {
    IOTHandler::turn_on()?;
    Ok(HttpResponse::Ok().finish())
}

pub async fn off() -> Result<HttpResponse, ServiceError> {
    IOTHandler::turn_off()?;
    Ok(HttpResponse::Ok().finish())
}

pub async fn setb(info: web::Path<u8>) -> Result<HttpResponse, ServiceError> {
    IOTHandler::set_brightness(info.into_inner())?;
    Ok(HttpResponse::Ok().finish())
}

pub async fn index() -> Result<NamedFile, ServiceError> {
    Ok(NamedFile::open("./static/index.html")?)
}