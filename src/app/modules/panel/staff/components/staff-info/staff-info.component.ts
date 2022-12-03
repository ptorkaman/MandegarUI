import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../../../../../app/shared/base/base.component';
import { StaffService } from '../../services/staff.service';

@Component({
  selector: 'app-staff-info',
  templateUrl: './staff-info.component.html',
  styleUrls: ['./staff-info.component.scss']
})
export class StaffInfoComponent extends BaseComponent implements OnInit {

  @Input() staffId: number;
  constructor(route: ActivatedRoute, private staffService: StaffService) {
    super(route)
  }

  staffImage = 'assets/images/Default.jpg'
  staffFullName;
  staffPersonneliCode;

  ngOnInit() {
    this.getStaffData();
  }

  getStaffData() {
    this.setLoading(true);
    this.staffService.getById(this.staffId).subscribe(res => {
      if (res.success && res.data) {
        if (res.data.image) {
          this.staffImage = res.data.image;
        }

        this.staffFullName = `${res.data.name} ${res.data.family}`
        this.staffPersonneliCode = res.data.personneliCode;
      }

      this.setLoading(false);
    })
  }

  onErrorImage(event){
    event.target.src ='/assets/images/image-not-found.jpg'
    console.log(event)
  }
}
