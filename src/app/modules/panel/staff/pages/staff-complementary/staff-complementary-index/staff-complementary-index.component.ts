import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageLinks } from '../../../../../../../app/shared/statics/page-links';
import { BaseComponent } from '../../../../../../shared/base/base.component';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-staff-complementary-index',
  templateUrl: './staff-complementary-index.component.html',
  styleUrls: ['./staff-complementary-index.component.scss']
})
export class StaffComplementaryIndexComponent extends BaseComponent implements OnInit {

  id: number;
  constructor(route: ActivatedRoute,
    private staffService: StaffService) {
    super(route);

    this.id = +this.getRouteValue(route, 'staffId');
  }

  ngOnInit() {
    this.checkExistsStaff();
  }

  checkExistsStaff() {
    this.setLoading(true);

    this.staffService.existsStff(this.id).subscribe(result => {
      if (!result.success || result.data == false) {
        this.cancelClick();
      }

      this.setLoading(false)
    })
  }

  cancelClick() {
    this.navigateTo(['../..'])
  }

  goTo(id: number) {
    switch (id) {
      case 1:
        this.navigateTo([PageLinks.StaffAddress])
        break;

      case 2:
        this.navigateTo([PageLinks.StaffFurtherInformation])
        break;

      case 3:
        this.navigateTo([PageLinks.StaffFinancial])
        break;

      case 4:
        this.navigateTo([PageLinks.StaffDocument])
        break;

      case 5:
        this.navigateTo([PageLinks.StaffResume])
        break;

      case 6:
        this.navigateTo([PageLinks.StaffActivity])
        break;

      case 7:
        this.navigateTo([PageLinks.StaffFamily])
        break;

      case 8:
        this.navigateTo([PageLinks.StaffCooperation])
        break;

      case 9:
        this.navigateTo([PageLinks.StaffSacrifice])
        break;

      case 10:
        this.navigateTo([PageLinks.StaffUploadDocument])
        break;

      default:
        break;
    }
  }
}
