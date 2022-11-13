import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { PostService } from 'src/app/shared/services/post.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CreatePostPageComponent } from './components/create-post/create-post-page.component';
import { UpdatePostPageComponent } from './components/update-post/update-post-page.component';
import { PostPageRoutingModule } from './post-page-routing.module';
@NgModule({
  declarations: [
    CreatePostPageComponent,
    UpdatePostPageComponent,
    ConfirmationDialogComponent,
  ],
  imports: [SharedModule, PostPageRoutingModule],
  providers: [PostService],
})
export class PostPageModule {}
