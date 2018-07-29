<!DOCTYPE html>
<html lang="en">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?php echo $site->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">

  <?= css('assets/css/main.css') ?>
  <link href="https://fonts.googleapis.com/css?family=Work+Sans:400,500" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css?family=Anonymous+Pro" rel="stylesheet">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <?= js('assets/js/main.js') ?>

</head>
<body>

  <section id="text-wrap">
    <p>
      <?= $page->about()->kirbytextRaw() ?>
      These are her <button class="main-toggle section-toggle" rel="gallery" type="button" name="selected works gallery">selected works<span></span></button>
      and this is her <button class="main-toggle section-toggle" rel="archive" type="button" name="selected works gallery">archive<span></span></button>.
    </p>
  </section>
  <section id="gallery-wrap">
    <!-- gonna need to loop and parse that structure my guy -->
  </section>
  <section id="archive-wrap">
    <!-- gonna need to loop and parse that structure my guy -->
  </section>
    <!-- add a lil thing on the bottom with a contact -->
</body>
</html>
