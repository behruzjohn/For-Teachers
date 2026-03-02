import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  Chip,
  FormControl,
  FormLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { StyleForm } from './Form.style';
import assignment from '../../assets/add-file.png';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import add from '../../assets/add.svg';
import { Choraks, FORM_OPTIONS } from './constants';
import type { FormValues } from './types';
import deleteIcon from '../../assets/delete.svg';
import download from '../../assets/download.svg';

type FormProps = {
  onSubmit: (data: FormValues) => void;
};

function Form({ onSubmit }: FormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      exercises: [{ title: 'Topshiriq 1', score: '', width: 20 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });

  return (
    <StyleForm>
      <Stack
        mb={4}
        gap={2.4}
        component='form'
        className='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack flexDirection='row' gap={2}>
          <Controller
            name='examName'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth className='examName'>
                <Autocomplete
                  {...field}
                  disablePortal
                  value={field.value || null}
                  options={FORM_OPTIONS}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Qaysi chsb yoki bsb ekanligini tanlang'
                    />
                  )}
                />
              </FormControl>
            )}
          />
          <Controller
            name='chorak'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth className='examName'>
                <Autocomplete
                  {...field}
                  disablePortal
                  options={Choraks}
                  value={field.value || null}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label='Chorakni tanlang' />
                  )}
                />
              </FormControl>
            )}
          />
        </Stack>
        <Stack flexDirection='row' gap={2}>
          <Controller
            name='class'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth className='examName'>
                <TextField
                  type='text'
                  {...field}
                  required
                  error={!!errors[field.name]}
                  placeholder='Sinfini kiriting.'
                />
              </FormControl>
            )}
          />

          <Controller
            name='countOfStudents'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth className='count-of-students'>
                <TextField
                  type='number'
                  {...field}
                  required
                  error={!!errors[field.name]}
                  placeholder="O'quvchilar sonini kiriting"
                />
              </FormControl>
            )}
          />
          <Controller
            name='totalScore'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth className='count-of-students'>
                <TextField
                  type='number'
                  {...field}
                  required
                  error={!!errors[field.name]}
                  placeholder='Jami ballni kiriting...'
                />
              </FormControl>
            )}
          />
        </Stack>
        <Accordion
          style={{ borderRadius: 4 }}
          slotProps={{ transition: { unmountOnExit: true } }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <img src={assignment} alt='icon' width={28} height={28} />
            <Typography ml={1}>Topshiriqlarni qo'shish</Typography>
          </AccordionSummary>

          <AccordionDetails>
            {fields.map((item, index) => (
              <Stack
                key={item.id}
                flexDirection='row'
                gap={1}
                // alignItems='center'
                mb={2}
              >
                {/* <Controller
                  name={`exercises.${index}.title`}
                  control={control}
                  render={({ field }) => (
                    <Chip
                      color='default'
                      style={{
                        borderRadius: 12,
                        width: '50%',
                        height: 50,
                        fontSize: 15,
                      }}
                      {...field}
                      label={`Topshiriq ${index + 1}`}
                    />
                  )}
                />
                <Typography variant='h6'>-</Typography> */}
                <Stack style={{ width: '100%' }}>
                  <Typography fontSize={13} variant='caption'>
                    Topshiriq {index + 1}
                  </Typography>
                  <Controller
                    name={`exercises.${index}.score`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        style={{ marginTop: 4 }}
                        {...field}
                        type='number'
                        required
                        error={!!errors?.exercises?.[index]?.score}
                        placeholder='Balini kiriting'
                      />
                    )}
                  />
                </Stack>
                <Stack mt={3.6}>
                  <IconButton
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                  >
                    <img width={24} height={24} src={deleteIcon} />
                  </IconButton>
                </Stack>
              </Stack>
            ))}

            <Stack alignItems='flex-end' justifyContent='center'>
              <Button
                startIcon={<img width={24} height={24} src={add} />}
                color='info'
                size='small'
                variant='contained'
                onClick={() =>
                  append({
                    title: `Topshiriq ${fields.length + 1}`,
                    score: '',
                    width: 20,
                  })
                }
              >
                Yana Qo'shish
              </Button>
            </Stack>
          </AccordionDetails>
        </Accordion>
        <Stack>
          <Button
            style={{ height: 40 }}
            color='success'
            startIcon={<img width={20} height={20} src={download} />}
            variant='contained'
            type='submit'
          >
            Yuklab olish
          </Button>
        </Stack>
      </Stack>
    </StyleForm>
  );
}
export default Form;
