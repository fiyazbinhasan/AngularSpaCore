import { Component, Input, OnChanges, OnInit, EventEmitter, Output  } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User, users } from '../user-models';
import { UserService } from '../user.service';

@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnChanges {
    @Input() user: User;
    @Output() created: EventEmitter<User> = new EventEmitter<User>();
    @Output() updated: EventEmitter<User> = new EventEmitter<User>();

    userForm: FormGroup;
    
    get name() { return this.userForm.get('name'); }

    constructor(private userService: UserService) {
    }
    
    ngOnChanges(): void {
        this.userForm = new FormGroup({
            name: new FormControl(this.user.name),
            avatar: new FormControl(null)
        }, { updateOn: 'submit' });
    }

    onSubmit() {
        if (this.userForm.valid) {
            if (this.user.id === undefined)
                this.userService.createUser(this.prepareSaveUser()).subscribe((user) => this.created.emit(user));
            else
                this.userService.updateUser(this.prepareSaveUser()).subscribe(() => this.updated.emit(this.user));
        }
    }

    prepareSaveUser(): FormData {
        debugger;
        const formModel = this.userForm.value;

        let formData = new FormData();
        formData.append("id", formModel.id);
        formData.append("name", formModel.name);
        formData.append("avatar", formModel.avatar);
       
        return formData;
    }

    fileChange(files: FileList) {
        debugger;
        if (files && files[0].size > 0) {
            this.userForm.patchValue({
                avatar: files[0]
            });
        }
    }
}