import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  input,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import IProduct from '../../../Models/Product/IProduct';
import { AppValidationErrorComponent } from '../../Error/app-validation-error/app-validation-error.component';
import { CategoryService } from '../../../services/category.service';
import ICategory from '../../../Models/Category/ICategory';
import { ToastService } from '../../../services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadImageComponent } from '../../image-dialog/upload-image/upload-image.component';
import { Router, ActivatedRoute } from '@angular/router';
import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { FileService } from '../../../services/file.service';
import ImageUrl from '../../../Models/File/ImageUrl';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, NgIf, AppValidationErrorComponent, NgFor],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent implements OnInit {
  // Removed unused or incorrect declaration
  product: IProduct = new IProduct();
  categories: ICategory[] = [] as ICategory[];
  productForm: FormGroup;
  isUpdateMode: boolean = false;
  prodouctId: number | null = null;
  Image: ImageUrl = new ImageUrl();

  constructor(
    // public dialogRef: MatDialogRef<AuctionFormComponent>,
    private _productService: ProductService,
    private _categoryService: CategoryService,
    private _tostService: ToastService,
    private _dialog: MatDialog,
    private fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _fileService: FileService
  ) {
    this.productForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: [0, [Validators.required, Validators.min(1)]],
      sellerName: ['', Validators.required],
      quantity: [1, Validators.min(1)],
      price: [0, Validators.min(10)],
    });
  }
  openImageDialog() {
    const dialogRef = this._dialog.open(UploadImageComponent, {
      width: '400px',
    });
    dialogRef.afterOpened;
    dialogRef.afterClosed().subscribe((imageUrl) => {
      if (imageUrl) {
        this.product.images.push(imageUrl);
        console.log('تم اضافة الصورة بنجاح', imageUrl);
      }
    });
  }
  removeImage(imageUrl: string) {
    this.Image.ImageUrl = imageUrl;
    if (this.isUpdateMode) {
      this._fileService
        .removeImageFromProduct(this.Image, this.prodouctId)
        .subscribe({
          next: (data) => {
            this.product.images.splice(
              this.product.images.indexOf(imageUrl),
              1
            );
            console.log('تم حذف الصورة بنجاح', data);
          },
          error: (error) => {
            console.error('Error removing file:', error);
          },
        });
    }
    if (!this.isUpdateMode) {
      this._fileService.removeImagFromTemp(this.Image).subscribe({
        next: (data) => {
          this.product.images.splice(this.product.images.indexOf(imageUrl), 1);
          console.log('تم حذف الصورة بنجاح', data);
        },
        error: (error) => {
          console.error('Error removing file:', error);
        },
      });
    }
  }

  ngOnInit(): void {
    this.getCategory();
    this._activatedRoute.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.prodouctId = idParam ? +idParam : null;
      if (this.prodouctId != null) {
        this._productService.productId = this.prodouctId;
        this.isUpdateMode = true;
        this._productService.isUpdaetMode = true;
        this._productService.getProductById(this.prodouctId).subscribe({
          next: (data) => {
            this.product = data;
            console.log('Product:', this.product);
            this.productForm.setValue(data);
          },
          error: (error) => {
            alert(error);
          },
        });
      } else {
        this.isUpdateMode = false;

        this._productService.isUpdaetMode = false;
      }
    });
  }

  /*closeDialog(): void {
    //  this.dialogRef.close();
    this.isOpen = false;
    this.close.emit();
  }*/
  back() {
    this._router.navigate(['/Products']);
  }

  getCategory() {
    this._categoryService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        alert(error);
      },
    });
  }
  submitForm(): void {
    if (!this.productForm.invalid) {
      if (!this.isUpdateMode) {
        this.product.categoryId = this.productForm.get('categoryId')?.value;
        this.product.sellerName = this.productForm.get('sellerName')?.value;
        this.product.sellerId = 1; // hardcoded for now
        this.product.name = this.productForm.get('name')?.value;
        this.product.description = this.productForm.get('description')?.value;
        this.product.price = this.productForm.get('price')?.value;
        this.product.quantity = this.productForm.get('quantity')?.value;

        this._productService.addProduct(this.product).subscribe({
          next: (data) => {
            alert('تم اضافة المنتج بنجاح');
            this.back();
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
      if (this.isUpdateMode) {
        this._productService.updateProduct(this.productForm.value).subscribe({
          next: (data) => {
            this._tostService.sucess('تم تعديل المنتج بنجاح', 'نجاح');
            this.back();
          },
          error: (error) => {},
        });
      }
    }
  }
}
