import shutil

try:
    shutil.rmtree('os')
except OSError as e:
    print('Error: %s - %s.' % (e.filename, e.strerror))

