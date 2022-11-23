$(document).ready(() => {
  console.log('Hello World'); 
  $('#getBook').on('click', () => {
    if ($('#bookCreate').val() != '2') {
      alert('You need fill all fields');
    } else {
      alert('Book created');
    }
  });

  $('#getAuthor').on('click', () => {
    const authorCreated = $('#authorCreate').val();
    console.log(authorCreated);
    if (authorCreated !== '2') {   
      alert('You need fill all fields');
    } else {
      alert('Author created');
    }
  });

  $('#getEditorial').on('click', () => {
    if ($('#editorialCreate').val() !== '2') {
      alert('You need fill all fields');
    } else {
      alert('Editorial created');
    }
  });

  $('#getCategory').on('click', () => {
    if ($('#categoryCreate').val() !== '2') {
      alert('You need fill all fields');
    } else {
      alert('Category created');
    }
  });
});
