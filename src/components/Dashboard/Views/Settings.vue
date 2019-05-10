<template>
  <div class="container">
       <div class="col-md-12">
      <div class="card">
        <div class="card-header">
        </div>
        <div class="card-content">
          <div class="form-horizontal">
          <fieldset>
             <div class="form-group column-sizing">
                <label class="col-sm-2 control-label">Name</label>
                <div class="col-sm-10">
                  <div class="row">
                    <div class="col-md-7">
                      <input type="text" placeholder=".col-md-3" class="form-control">
                    </div>
                    <div class="col-sm-1">
                     <label class="col-md-4 control-label">ID</label>
                    </div>
                     <div class="col-md-2">
                      <input type="text" placeholder=".col-md-4" class="form-control">
                    </div>
                  </div>
                  <span class="help-block">A block of help text that breaks onto a new line.</span>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">Email</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control">
                  <span class="help-block">A block of help text that breaks onto a new line.</span>
                </div>
              </div>
            </fieldset>

             <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">Public email</label>
                <div class="col-sm-10">
                  <select class="form-control">
                    <option>Do not show profile</option>
                    <option>Do not show profile</option>
                    <option>Do not show profile</option>
                    <option>Do not show profile</option>
                  </select>
                  <span class="help-block">A block of help text that breaks onto a new line.</span>
                </div>
              </div>
            </fieldset>
            
             <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">Preferred Language</label>
                <div class="col-sm-10">
                  <select class="form-control">
                    <option>English</option>
                    <option>Do not show profile</option>
                    <option>Do not show profile</option>
                    <option>Do not show profile</option>
                  </select>
                  <span class="help-block">A block of help text that breaks onto a new line.</span>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">Skype</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control">
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">Linkedin</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control">
                </div>
              </div>
            </fieldset>

              <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">Facebook</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control">
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">Twitter</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control">
                </div>
              </div>
            </fieldset>

             <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">Website</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control">
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">Location</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control">
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">Organization</label>
                <div class="col-sm-10">
                  <input type="email" class="form-control">
                </div>
              </div>
            </fieldset>

            <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label">Bio</label>
                <div class="col-sm-10">
                  <textarea class="form-control" placeholder="Here can be your nice text" rows="3"></textarea>
                </div>
              </div>
            </fieldset>

              <fieldset>
              <div class="form-group">
                <label class="col-sm-2 control-label"></label>
                <div class="col-sm-10" >
                  <button type="submit" class="btn btn-fill btn-danger" style="float:right">Cancel</button>
                   <button type="submit" class="btn btn-fill btn-default" style="float:right">Submit</button>
                </div>
              </div>
            </fieldset>
            <div>
            
            </div>


          </div>
        </div>
      </div>  <!-- end card -->
    </div> <!-- end col-md-12 -->
  </div>
</template>
<script>
  export default {
    data () {
         return {
        radios: {
          radio1: '1',
          radio2: '2',
          radio3: '2'
        },
        checkboxes: {
          first: false,
          second: false,
          a: false,
          b: false,
          c: false,
          unchecked: false,
          checked: true,
          disabledUnchecked: false,
          disabledChecked: true
        }
      }
    },
    methods: {
     }
  };
</script>
<style>
</style>
