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
import { Table, TableService } from 'primeng/table';

import { PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

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
  providers: [MessageService, ConfirmationService, Table, TableService],
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

  selectedProducts!: any[];

  userID: number = 0;
  statuses!: any[];
  products!: any[];
  productDialog!: boolean;
  productObject!: any;
  isEditMode!: boolean;

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private primengConfig: PrimeNGConfig,
    private cd: ChangeDetectorRef
  ) {
    this.userID = parseInt(localStorage.getItem('user_id')!);
  }

  // tell angular that you updated the form content after ngAfterContentChecked
  ngAfterContentChecked() {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.getUserProduct();

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

  getUserProduct() {
    // get all product this user has uploaded
    this.productService.fetchAllProduct().subscribe({
      next: (data) => {
        this.products = data.filter(
          (item: { user_id: number }) => item.user_id === this.userID
        );
      },
      error: (error) => console.log(error),
    });
  }

  severityColor(val: any) {
    if (val === 'Instock') {
      return 'success';
    } else {
      return 'danger';
    }
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        for (let ele of this.selectedProducts) {
          this.productService.deleteProduct(ele.product_id).subscribe({
            next: (msg) => {
              if (msg === 'Delete product success!') {
                this.selectedProducts.shift(); // remove the first element of this array
              }
              this.getUserProduct();
            },
            error: (error) => console.log(error),
          });
        }

        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  deleteProduct(productObj: any) {
    this.confirmationService.confirm({
      message:
        'Are you sure you want to delete ' + productObj.product_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.productService.deleteProduct(productObj.product_id).subscribe({
          next: (msg) => {
            if (msg === 'Delete product success!') {
              this.messageService.add({
                severity: 'success',
                summary: 'Successful',
                detail: msg,
                life: 3000,
              });
              this.getUserProduct();
            } else {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: msg,
                life: 3000,
              });
            }
          },
          error: (error) => console.log(error),
        });
      },
    });
  }

  hideDialog() {
    this.formRef.reset();
    this.productDialog = false;
  }

  // will open a small dialog
  openNew() {
    this.productObject = {};
    this.productDialog = true;
    this.isEditMode = false;
  }

  editProduct(product: any) {
    this.productObject = { ...product };

    this.formRef.patchValue({
      productImage: this.productObject.product_image,
      productName: this.productObject.product_name,
      quality: this.productObject.quality,
      description: this.productObject.descriptions,
      unitPrice: this.productObject.unit_price,
      status: this.productObject.product_status,
      category: this.productObject.category,
    });

    this.productDialog = true;
    this.isEditMode = true;
  }

  saveProduct() {
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
          this.getUserProduct();
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

  editProductSave() {
    let productData = this.formRef.value;

    this.productService
      .updateProduct(productData, this.productObject.product_id)
      .subscribe({
        next: (msg) => {
          if (msg == 'Update product success!') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: msg,
              life: 3000,
            });
            this.getUserProduct();
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

  submit() {
    if (!this.isEditMode) {
      this.saveProduct();
    } else {
      this.editProductSave();
    }
  }
}
