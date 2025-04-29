import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FileService } from '../../../services/file.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.css',
})
export class UploadImageComponent {
  selectedFile!: File;
  selectedFileName: string = '';
  errorMessage: string = '';
  constructor(
    private http: HttpClient,
    private dialogRef: MatDialogRef<UploadImageComponent>,
    private _fileService: FileService,
    private _activeRouter: ActivatedRoute,
    private _productService: ProductService
  ) {}
  onFileSelected(event: any) {
    this.errorMessage = '';
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
  }

  upload() {
    if (!this.selectedFile) return;
    console.log(this._productService.productId);
    if (
      this._productService.isUpdaetMode &&
      this._productService.productId != null
    ) {
      this._fileService
        .uploadImageToProduct(this.selectedFile, this._productService.productId)
        .subscribe({
          next: (data) => {
            this.dialogRef.close(data);
          },
          error: (error) => {
            console.error('Error uploading file:', error);
            this.errorMessage = 'فشل رفع الصورة، حاول مرة أخرى';
          },
        });
    }
    if (!this._productService.isUpdaetMode) {
      this._fileService.uploadImageToTemp(this.selectedFile).subscribe({
        next: (data) => {
          this.dialogRef.close(data);
        },
        error: (error) => {
          console.error('Error uploading file:', error);
          this.errorMessage = 'فشل رفع الصورة، حاول مرة أخرى';
        },
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
