
// check if the form was submitted
if ($_POST['submit_button']) {
    // this means the submit button was clicked, and the form has refreshed the page
    // to access the content in text area, you would do this
    $a = $_POST['update'];

    // now $a contains the data from the textarea, so you can do whatever with it
    // this will echo the data on the page
    echo $a;
}
else {
    // form not submitted, so show the form

?>

<form method="post" action="<?php echo $_SERVER['PHP_SELF']; ?>"> <!-- notice the updated action -->
<textarea cols="30" rows="4" name="update" id="update" maxlength="200" ></textarea>
<br />
<input name="submit_button" type="submit"  value=" Update "  id="update_button"  class="update_button"/> <!-- notice added name="" -->
</form>

<?php

} // end "else" loop

?>