use actix_web::{error::ResponseError, HttpResponse};
use derive_more::Display;
use std::io::{Error as IOError, Error};

//custom error type that handles all errors
#[derive(Debug, Display)]
pub enum ServiceError {
    #[display(fmt = "")]
    InternalServerError,
}

const INTERNAL_SERVER_ERROR: &'static str = "internal server error";

impl ResponseError for ServiceError {
    fn error_response(&self) -> HttpResponse {
        match self {
            ServiceError::InternalServerError => HttpResponse::InternalServerError().json(INTERNAL_SERVER_ERROR),
        }
    }
}

impl From<IOError> for ServiceError {
    fn from(_: Error) -> Self {
        ServiceError::InternalServerError
    }
}