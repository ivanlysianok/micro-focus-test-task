import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/modules/shared.module';
import { AuthService } from '../../shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CreatePostPageComponent } from './components/create-post/create-post-page.component';
import { UpdatePostPageComponent } from './components/update-post/update-post-page.component';
import { PostPageRoutingModule } from './post-page-routing.module';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthGuard } from '../../shared/guards/auth.guard';
@NgModule({
  declarations: [
    CreatePostPageComponent,
    UpdatePostPageComponent,
    ConfirmationDialogComponent,
  ],
  imports: [SharedModule, PostPageRoutingModule],
  providers: [PostService, AuthService, NotificationService, AuthGuard],
})
export class PostPageModule {}
