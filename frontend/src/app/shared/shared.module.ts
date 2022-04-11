import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileService } from './services/profile.service';

@NgModule({
 providers: [ProfileService],
 declarations: [],
 imports: [
   CommonModule,
   RouterModule,
   BrowserModule,
   HttpClientModule,
   BrowserAnimationsModule,
 ],
 exports: [
   CommonModule,
   BrowserModule,
 ],
})
export class SharedModule { }
