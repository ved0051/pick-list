import { Injectable } from '@angular/core';
import { PickListModel } from '../model/pick-list-dto.model';

@Injectable({
  providedIn: 'root'
})
export class PickListService {

  masterData = [
    {
      binNumber : 'P1-A2-2-12',
      items : [
        {
          barcode : 'B11511922',
          quantity : 10
        },
        {
          barcode : 'B11511926',
          quantity : 3
        }
      ]
    },
    {
      binNumber : 'P1-A2-3-13',
      items : [
        {
          barcode : 'B11511923',
          quantity : 5
        },
        {
          barcode : 'B11511921',
          quantity : 3
        }
      ]
    },
    {
      binNumber : 'P1-A2-4-14',
      items : [
        {
          barcode : 'B11511924',
          quantity : 5
        }
      ]
    },
    {
      binNumber : 'P1-A2-5-15',
      items : [
        {
          barcode : 'B11511925',
          quantity : 2
        }
      ]
    }
  ];

  pickList = [
    {
      binNumber : 'P1-A2-2-12',
      barcode : 'B11511922',
      notFound : 0,
      quantity : 4,
      picked : 0,
      pending : 1
    },
    {
      binNumber : 'P1-A2-3-13',
      barcode : 'B11511923',
      notFound : 0,
      quantity : 10,
      picked : 0,
      pending : 1
    },
    {
      binNumber : 'P1-A2-4-14',
      barcode : 'B11511924',
      notFound : 0,
      quantity : 2,
      picked : 0,
      pending : 1
    },
    {
      binNumber : 'P1-A2-5-15',
      barcode : 'B11511925',
      notFound : 0,
      quantity : 3,
      picked : 0,
      pending : 1
    },
    {
      binNumber : 'P1-A2-2-12',
      barcode : 'B11511926',
      notFound : 0,
      quantity : 2,
      picked : 0,
      pending : 1
    }
  ];

  getAllPickListItem() {
    let items = [];
    if (localStorage.getItem('pickListItems') === null) {
      localStorage.setItem('pickListItems', JSON.stringify(this.pickList));
    }
    items = JSON.parse(localStorage.getItem('pickListItems'));
    return items;
  }

  getMasterData() {
  let masterData = [];
    if (localStorage.getItem('masterData') === null) {
      localStorage.setItem('masterData', JSON.stringify(this.masterData));
    }
    masterData = JSON.parse(localStorage.getItem('masterData'));
    return masterData;
  }

  updatePickList(data: PickListModel) {
    const items = JSON.parse(localStorage.getItem('pickListItems'));
    const index = items.findIndex(value => value.binNumber === data.binNumber);
    items.splice(index, 1);
    items.push(data);
    localStorage.setItem('pickListItems', JSON.stringify(items));
  }

  getMasterDataByBinNumber(binNumber: string, barcode: string) {
    const master = this.getMasterData();
    const item = master.find(element => element.binNumber === binNumber);
    if (item) {
      const masterData = item.items.find(data => data.barcode === barcode);
      return masterData ? masterData.quantity : null;
    }
  }

  updateMasterDataByBinNumber(binNumber: string, barcode: string, quantity: number) {
    const master = JSON.parse(localStorage.getItem('masterData'));
    const binIndex = master.findIndex(item => item.binNumber === binNumber);

    if (binIndex !== -1) {
      const barcodeIndex = master[binIndex].items.findIndex(data => data.barcode === barcode);
      master[binIndex].items[barcodeIndex].quantity = quantity;
    }
    localStorage.setItem('masterData', JSON.stringify(master));
  }

  resetLists() {
    localStorage.setItem('pickListItems', JSON.stringify(this.pickList));
    localStorage.setItem('masterData', JSON.stringify(this.masterData));
  }
}
