<?php
/** @var \Dedoc\Scramble\GeneratorResult $result */
?>
<?php if(\Dedoc\Scramble\Support\DevTools::enabled()): ?>
    <?php
        $devToolsData = [
            'diagnostics' => $result->diagnostics()->toArray(),
            'renderer' => $renderer,
            'proNudge' => $result->proNudge()->message(),
        ];
    ?>

    <script type="application/json" id="scramble-dev-tools-data"><?php echo json_encode($devToolsData, 15, 512) ?></script>

    <?php if($viteServerUrl = \Dedoc\Scramble\Support\DevTools::viteServerUrl()): ?>
        <script type="module" src="<?php echo e($viteServerUrl); ?>/@vite/client"></script>
        <script type="module" src="<?php echo e($viteServerUrl); ?>/resources/js/devtools.tsx"></script>
    <?php else: ?>
        <script type="module" src="<?php echo e(route('scramble.dev-tools.asset')); ?>"></script>
    <?php endif; ?>
<?php endif; ?>
<?php /**PATH /var/www/html/vendor/dedoc/scramble/resources/views/dev-tools.blade.php ENDPATH**/ ?>