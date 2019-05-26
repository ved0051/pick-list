import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PickListService } from '../../services/pick-list.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PickListModel } from '../../model/pick-list-dto.model';

@Component({
  selector: 'app-item-crate',
  templateUrl: './item-crate.component.html',
  styleUrls: ['./item-crate.component.scss']
})
export class ItemCrateComponent implements OnInit {
  @ViewChild('binNumberInputRef') binNumberInputRef: ElementRef;

  pickList: PickListModel[];
  activeItem: PickListModel;
  nextItem: PickListModel;
  masterDataQuantity: number;
  lastScanned: string;
  isCorrectBin = false;
  isCorrectBarcode = true;
  form: FormGroup;
  itemEmptyInMaster = false;
  isSuccess = false;

  constructor(
    private pickListService: PickListService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getPickList();
    this.buildForm();
    this.form.get('binNum').valueChanges.subscribe(val => {
      if (val) {
       this.checkBinNumber(val);
      } else {
        this.isCorrectBin = false;
        this.form.get('barCode').disable();
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      binNum: null,
      barCode: [{value : null, disabled: true}]
    });
  }

  checkBinNumber(value) {
    this.isCorrectBin = this.activeItem && this.activeItem.binNumber === value;
    this.form.get('barCode').reset({value : null, disabled : !this.isCorrectBin });
  }

  checkBarcode(value: string) {
    this.lastScanned = this.form.get('barCode').value;
    this.isCorrectBarcode = this.activeItem.barcode === value;

    console.log(this.masterDataQuantity);
    if (this.isCorrectBarcode) {
      if (this.isCorrectBarcode && this.masterDataQuantity === 0) {
        this.itemEmptyInMaster = true;
        this.form.get('barCode').reset({value : null, disabled : true});
      }

      if (this.masterDataQuantity > 0) {
        this.activeItem.picked += 1;
        this.masterDataQuantity -= 1;
      }
    }

    if (this.activeItem.picked === this.activeItem.quantity) {
      this.cardCompleteFun();
    }

    this.form.get('barCode').reset();
  }

  cardCompleteFun() {
    this.activeItem.notFound = this.activeItem.quantity - this.activeItem.picked;
    this.activeItem.pending -= 1;
    this.pickListService.updatePickList(this.activeItem);
    this.pickListService.updateMasterDataByBinNumber(this.activeItem.binNumber, this.activeItem.barcode, this.masterDataQuantity);

    this.getPickList();
    this.isCorrectBin = false;
    this.form.reset();
    this.form.get('barCode').disable();
    this.itemEmptyInMaster = false;
    this.binNumberInputRef.nativeElement.focus();
  }

  getPickList() {
    this.pickList = this.pickListService.getAllPickListItem().filter(items => items.pending > 0);
    this.activeItem = this.pickList[0] ? this.pickList[0] : null;
    this.nextItem = this.pickList[1] ? this.pickList[1] : null;
    this.masterDataQuantity = this.activeItem
    ? this.pickListService.getMasterDataByBinNumber(
        this.activeItem.binNumber,
        this.activeItem.barcode) : 0;
  }

  resetList() {
    this.pickListService.resetLists();
    this.getPickList();
    this.form.reset();
  }
}
