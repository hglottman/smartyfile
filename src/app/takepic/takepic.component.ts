import { Component, OnInit, Inject } from '@angular/core';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from '../user.service'
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-takepic',
  templateUrl: './takepic.component.html',
  styleUrls: ['./takepic.component.css']
})
export class TakepicComponent implements OnInit {
  pic;
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    // width: {ideal: 1024},
    // height: {ideal: 576}
  };
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();
  constructor(public dialogRef: MatDialogRef<TakepicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public userService: UserService) { }

  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs()
      .then((mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      });
  }
  sendNewPic(webcamImage) {
    this.webcamImage = webcamImage;
    this.dialogRef.afterClosed().subscribe((data) => {
      this.userService.saveuserimage(this.webcamImage);
    });
    this.dialogRef.close()
  }
  public triggerSnapshot(): void {
    this.trigger.next();
    this.showWebcam = false
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public handleInitError(error: WebcamInitError): void {
    this.errors.push(error);
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }

  public handleImage(webcamImage: WebcamImage): void {
    console.info('received webcam image', webcamImage);
    this.webcamImage = webcamImage;

    // console.log(this.webcamImage + "webcamImage")
    // console.log(this.webcamImage.imageAsDataUrl)
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log('active device: ' + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

}