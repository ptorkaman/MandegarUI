import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tree } from 'primeng/tree';
import { BaseComponent } from '../../base/base.component';
import { TreeReturnTypeEnum } from '../../models/tree-return-type-enum.model';
import { TreeSelectionModeEnum } from '../../models/tree-selection-mode-enum.model';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent extends BaseComponent implements OnInit {

  data!: any[];
  selectedItems: any[] = [];
  isIn = true;
  loading = false;

  @ViewChild('tree')
  tree!: Tree;

  @Input() expand: boolean = false;
  @Input() set seletedIds(ids: number[]) {
    setTimeout(() => {

      if (this.isIn && ids && ids.length != 0) {

        this.isIn = false;



        this.filterSelection(this.data, ids);

      }
    }, 300);

  };

  @Input() returnType: TreeReturnTypeEnum = TreeReturnTypeEnum.Id;
  @Input() items: any[] = [];
  @Input() selectionMode: TreeSelectionModeEnum = TreeSelectionModeEnum.checkbox;

  @Output() nodeSelected: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

  constructor(route: ActivatedRoute) {
    super(route);
  }

  ngOnInit(): void {
    this.getData();

    let event = { target: '' }
    this.selectedItems.forEach(element => {
      this.tree.onNodeClick(event, element);
    });

  }

  private getData(): void {

    this.data = arrayToTree<any>(this.items, {
      id: "id",
      parentId: "parentId",
      label: 'name'
    });

    // this.data?.forEach(item => {
    //   item.icon = 'p-treenode-icon mdi mdi-arrow-left-bold';

    //   item?.children?.forEach((child: any) => {
    //     child.icon = 'p-treenode-icon mdi mdi-arrow-left-thin';

    //   });
    // })
    this.expandAll();

  }

  nodeSelect(event: any) {
    let data: any;

    if (this.selectionMode === TreeSelectionModeEnum.checkbox) {
      if (this.returnType == TreeReturnTypeEnum.IdTitle) {
        data = this.selectedItems.map((item: any) => {
          return {
            id: item.id,
            title: item.label
          }
        })
      } else if (this.returnType == TreeReturnTypeEnum.Id) {
        data = this.getkeyValuesByKey(this.selectedItems, 'id');
      }
      else {
        data = null;
      }
    }
    else if (this.selectionMode === TreeSelectionModeEnum.single) {
      if (this.returnType == TreeReturnTypeEnum.IdTitle) {
        data = {
          id: event.node.id,
          title: event.node.label
        }

      } else if (this.returnType == TreeReturnTypeEnum.Id) {
        data = event.node.id;
      }
      else {
        data = null;
      }


    }

    this.nodeSelected.next(data)
  }

  nodeUnSelect(event: any) {
    let data: any;
    if (this.returnType == TreeReturnTypeEnum.IdTitle) {
      data = this.selectedItems.map((lstItem: any) => {
        return {
          id: lstItem.id,
          title: lstItem.label
        }
      })
    } else if (this.returnType == TreeReturnTypeEnum.Id) {
      data = this.getkeyValuesByKey(this.selectedItems, 'id');
    }
    else {
      data = null;
    }

    this.nodeSelected.next(data)
  }

  filterSelection(data: any[], ids: any[]) {
    data.forEach(item => {

      if (ids.includes(item.id)) {
        this.selectedItems.push(item)
      }

      if (item.children && item.children?.length > 0) {
        this.filterSelection(item.children, ids)
      }
    })

  }

  expandAll() {
    this.data.forEach(node => {
      this.expandRecursive(node, this.expand);
    });
  }

  private expandRecursive(node: any, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode: any) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }

  onNodeExpand(event: any) {
    //Call Url
    // this.loading = true;
  }
}




export type TTree<T> = {
  children?: TTree<T>[];
} & T;

export const arrayToTree = <T>(
  list: T[],
  { id, parentId, label }: { id: string; parentId: string; label: string; }
): TTree<T>[] | [] => {

  const map: any[] = [];
  const treeList: TTree<T>[] = list as TTree<T>[];

  for (let i = 0; i < treeList.length; i += 1) {
    map[(treeList[i] as TTree<T> & { [id: string]: number })[id]] = i;

    // treeList[i]['label'] = treeList[i][label] == null ? treeList[i]["permissionGroupName"] : treeList[i][label];
    // treeList[i]['icon'] = treeList[i]['permissionGroupId'] == null ? 'p-treenode-icon mdi mdi-key' : 'p-treenode-icon pi pi-fw pi-folder-open';
    // treeList[i]['expanded'] = true;


    treeList[i].children = [];
  }

  let node: TTree<T> & { [parentId: string]: number };

  const roots: TTree<T>[] = [];

  for (const item of treeList) {
    node = item as TTree<T> & { [parentId: string]: number };
    if (node[parentId] !== null) {
      if (treeList[map[node[parentId]]] !== undefined) {
        treeList[map[node[parentId]]].children?.push(node);
      }
    } else {
      roots.push(node);
    }
  }
  return roots;
};
