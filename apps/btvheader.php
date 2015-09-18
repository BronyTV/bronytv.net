<!DOCTYPE html>
<html lang="en-US">
  <head>
    <title>BronyTV</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href='/Pictures/BTVpurple.png' />
    <!--[if lt IE 9]>
      <script src="//html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
    <link rel='stylesheet' id='btv-css' href='style.css' type='text/css' media='all' />
    <link href="http://cdn.jotfor.ms/static/formCss.css?3.1.513" rel="stylesheet" type="text/css" />
    <link type="text/css" rel="stylesheet" href="apply.css" />
    <script type='text/javascript' src='//code.jquery.com/jquery-1.10.2.min.js'></script>
    <script type='text/javascript' src='/nowplaying.js?ver=1.1'></script>
    <script type="text/javascript">
      $(document).ready(function() {
        $("#chatbox").width(parseInt($("#surround").width()) - parseInt($("#player").width()) - 5);
      }) ;
      $(window).resize(function() {
        $("#chatbox").width(parseInt($("#surround").width()) - parseInt($("#player").width()) - 5);
      }) ;
    </script>
  </head>
  <body onload="countdown(year,month,day,hour,minute)">
  <div id="header" class="container">
  <div style="display:inline-block;">
    <table>
      <tr>
        <td>
          <a href="http://www.bronytv.net/"><img src="/Pictures/logotext.png" alt="BronyTV"></a>
        </td>
        <td style="display:inline;">
          <table><tr><td>
            <span class="streaming">
              <span style="margin-top:10px;">Now Streaming:</span>
              <span class="streamer" style="padding: 0; margin: 0;" id="nowplaying">Loading</span>
            </span>
          </td></tr><tr><td>
            <div style="display:inline;">
              <ul class="nav">
                <?php if ($_SERVER['REQUEST_URI']=='/stream.php'): ?>
                <li class="current_page_item"><a href="/stream.php">Stream</a></li>
                <?php else: ?>
                <li><a href="/stream.php">Stream</a></li>
                <?php endif ?>
                <?php if ($_SERVER['REQUEST_URI']=='/about.php'): ?>
                <li class="current_page_item"><a href="/about.php">About Us</a></li>
                <?php else: ?>
                <li><a href="/about.php">About Us</a></li>
                <?php endif ?>
                <?php if ($_SERVER['REQUEST_URI']=='/rules.php'): ?>
                <li class="current_page_item"><a href="/rules.php">Rules</a></li>
                <?php else: ?>
                <li><a href="/rules.php">Rules</a></li>
                <?php endif ?>
                <?php if ($_SERVER['REQUEST_URI']=='/schedule.php'): ?>
                <li class="current_page_item"><a href="/schedule.php">Schedule</a></li>
                <?php else: ?>
                <li><a href="/schedule.php">Schedule</a></li>
                <?php endif ?>
                <?php if ($_SERVER['REQUEST_URI']=='/contact.php'): ?>
                <li class="current_page_item"><a href="/contact.php">Contact Us</a></li>
                <?php else: ?>
                <li><a href="/contact.php">Contact Us</a></li>
                <?php endif ?>
              </ul>
            </div>
          </td></tr></table>
        </td>
      </tr>
    </table>
    </div></div>
    <a href="http://officeofstrategicinfluence.com/spam/" style="position:absolute;left:-1000px;top:-1000px;">This link kills spam</a>
