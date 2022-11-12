import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { PostService } from 'src/app/shared/services/post.service';
import { CreatePostPageComponent } from './components/create-post/create-post-page.component';
import { UpdatePostPageComponent } from './components/update-post/update-post-page.component';
import { PostPageRoutingModule } from './post-page-routing.module';
@NgModule({
  declarations: [CreatePostPageComponent, UpdatePostPageComponent],
  imports: [SharedModule, PostPageRoutingModule],
  exports: [CreatePostPageComponent, UpdatePostPageComponent],
  providers: [PostService],
})
export class PostPageModule {}
