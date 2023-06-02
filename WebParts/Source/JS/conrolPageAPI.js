async function loadPage(pageUrl, parameter) {
    localStorage.setItem('parameter',encodeURIComponent(parameter));
    alert(parameter+' is loaded');
    await $.ajax({
        url: pageUrl,
        method: 'GET',
        success: function (data) {
            // Обработка загруженного контента
            $('#content-container').html(data);
            $('#content-container').addClass('animated fadeIn');
        },
        error: function (error) {
            console.error(error);
        }
    });
}