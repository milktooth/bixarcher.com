<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    <title>
      <?php echo $site->title()->html() ?>
    </title>
    <meta name="description" content="<?= $site->description()->html() ?>">

    <?= css('assets/css/main.css') ?>
      <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Anonymous+Pro" rel="stylesheet">

      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  </head>

  <body>

    <section id="text-wrap">
        <?= $page->errorMessage()->kirbytext() ?>
    </section>

    <?= js('assets/js/main.js') ?>
  </body>

</html>
