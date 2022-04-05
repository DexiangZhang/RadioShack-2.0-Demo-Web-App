import { Component, OnInit } from '@angular/core';

import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ProductService } from 'src/app/service/product/product.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ChangeDetectorRef } from '@angular/core';
import { Table } from 'primeng/table';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-share-own-products',
  templateUrl: './share-own-products.component.html',
  styleUrls: ['./share-own-products.component.scss'],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class ShareOwnProductsComponent implements OnInit {
  formRef = new FormGroup({
    productImage: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required]),
    quality: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    unitPrice: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  product!: any;

  selectedProducts!: any[];

  userID: number = 0;
  statuses!: any[];
  products!: any[];
  productDialog!: boolean;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private cd: ChangeDetectorRef,
    private dt: Table
  ) {
    this.userID = parseInt(localStorage.getItem('user_id')!);
  }

  // tell angular that you updated the form content after ngAfterContentChecked
  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    // get all product this user has uploaded
    this.productService.fetchAllProduct().subscribe({
      next: (data) => {
        this.products = data.filter(
          (item: { user_id: number }) => item.user_id === this.userID
        );
      },
      error: (error) => console.log(error),
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'Instock', color: 'success' },
      { label: 'OUTOFSTOCK', value: 'OutofStock', color: 'danger' },
    ];

    this.primengConfig.ripple = true;
  }

  get productImage() {
    return this.formRef.get('productImage');
  }
  get productName() {
    return this.formRef.get('productName');
  }
  get quality() {
    return this.formRef.get('quality');
  }
  get description() {
    return this.formRef.get('description');
  }
  get unitPrice() {
    return this.formRef.get('unitPrice');
  }
  get status() {
    return this.formRef.get('status');
  }
  get category() {
    return this.formRef.get('category');
  }

  // will open a small dialog
  openNew() {
    this.product = {};
    this.productDialog = true;
  }

  // applyFilterGlobal($event: any, stringVal: any) {
  //   this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  // }

  // deleteSelectedProducts() {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete the selected products?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.products = this.products.filter(
  //         (val) => !this.selectedProducts.includes(val)
  //       );
  //       this.selectedProducts = null;
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Products Deleted',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }

  editProduct(product: any) {
    this.product = { ...product };
    this.productDialog = true;
  }

  // deleteProduct(product: any) {
  //   this.confirmationService.confirm({
  //     message: 'Are you sure you want to delete ' + product.name + '?',
  //     header: 'Confirm',
  //     icon: 'pi pi-exclamation-triangle',
  //     accept: () => {
  //       this.products = this.products.filter((val) => val.id !== product.id);
  //       this.product = {};
  //       this.messageService.add({
  //         severity: 'success',
  //         summary: 'Successful',
  //         detail: 'Product Deleted',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }

  hideDialog() {
    this.formRef.reset();
    this.productDialog = false;
  }

  submit() {
    let productData = this.formRef.value;

    this.productService.createNewProduct(productData).subscribe({
      next: (msg) => {
        if (msg == 'Product created!') {
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: msg,
            life: 3000,
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failure',
            detail: msg,
            life: 3000,
          });
        }
      },
      error: (error) => console.log(error),
    });

    this.formRef.reset();
    this.productDialog = false;
  }
}
