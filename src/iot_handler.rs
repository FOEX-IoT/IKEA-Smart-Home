use std::process::Command;
use crate::error::ServiceError;

pub struct IOTHandler;

lazy_static! {
    pub static ref USER: String = {

        std::env::var("OURUSER").expect("USER must be set")
    };
    pub static ref KEY: String = {
        std::env::var("KEY").expect("KEY must be set")
    };
    pub static ref IP: String = {
        std::env::var("IP").expect("IP must be set")
    };
    pub static ref DEVICE: String = {
        std::env::var("DEVICE").expect("DEVICE must be set")
    };
}

impl IOTHandler {
    pub fn turn_on() -> Result<(), ServiceError> {
        let val = json!({
            "3311" :
                [
                    {
                        "5850": 1
                    }
                ]
        });

        let mut cmd: Command = Command::new("coap-client");
        cmd.arg("-m");
        cmd.arg("put");
        cmd.arg("-u");
        cmd.arg(&(*USER)[..]);
        cmd.arg("-k");
        cmd.arg(&(*KEY)[..]);
        cmd.arg("-e");
        cmd.arg(val.to_string());
        cmd.arg("coaps://".to_owned() + &(*IP)[..] + "/15001/" + &(*DEVICE)[..]);

        cmd.output()?;
        Ok(())
    }

    pub fn turn_off() -> Result<(), ServiceError> {
        let val = json!({
            "3311" :
                [
                    {
                        "5850": 0
                    }
                ]
        });

        let mut cmd: Command = Command::new("coap-client");
        cmd.arg("-m");
        cmd.arg("put");
        cmd.arg("-u");
        cmd.arg(&(*USER)[..]);
        cmd.arg("-k");
        cmd.arg(&(*KEY)[..]);
        cmd.arg("-e");
        cmd.arg(val.to_string());
        cmd.arg("coaps://".to_owned() + &(*IP)[..] + "/15001/" + &(*DEVICE)[..]);

        cmd.output()?;
        Ok(())
    }

    pub fn set_brightness(brightness: u8) -> Result<(), ServiceError> {
        let val = json!({
            "3311" :
                [
                    {
                        "5851": brightness
                    }
                ]
        });

        let mut cmd: Command = Command::new("coap-client");
        cmd.arg("-m");
        cmd.arg("put");
        cmd.arg("-u");
        cmd.arg(&(*USER)[..]);
        cmd.arg("-k");
        cmd.arg(&(*KEY)[..]);
        cmd.arg("-e");
        cmd.arg(val.to_string());
        cmd.arg("coaps://".to_owned() + &(*IP)[..] + "/15001/" + &(*DEVICE)[..]);

        cmd.output()?;
        Ok(())
    }
}