import { Component, OnInit } from '@angular/core';
import { PickListService } from '../../services/pick-list.service';
import { PickListModel } from '../../model/pick-list-dto.model';

@Component({
  selector: 'app-pick-list',
  templateUrl: './pick-list.component.html',
  styleUrls: ['./pick-list.component.scss']
})
export class PickListComponent implements OnInit {
  pickList: PickListModel[];
  pending = 0;
  picked = 0;
  notFound = 0;
  quantity = 0;

  constructor(
    private pickListService: PickListService
  ) { }

  ngOnInit() {
    this.pickList = this.pickListService.getAllPickListItem();
    this.getSummary();
  }

  getSummary() {
    this.pickList.forEach((element: PickListModel) => {
      this.pending += element.pending;
      this.picked += element.picked;
      this.quantity += element.quantity;
      this.notFound += element.notFound;
    });
  }

  getbackColor(item: PickListModel) {
    if (item.notFound > 0) {
      return 'yellow';
    }

    if (item.pending === 0) {
      return 'lightGreen';
    }
  }
}
