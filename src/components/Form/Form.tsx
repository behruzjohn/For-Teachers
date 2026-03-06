import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Button,
  FormControl,
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
import { Choraks, FORM_OPTIONS, Genders } from './constants';
import type { FormValues } from './types';
import deleteIcon from '../../assets/delete.svg';
import download from '../../assets/download.svg';
import type { classType } from '../../pages/Home/types';

type FormProps = {
  onSubmit: (data: FormValues) => void;
  classNameData: classType[];
  setSelectedClass: React.Dispatch<React.SetStateAction<string>>;
  handleChangeGender: (newGender: string) => void;
};

function Form({
  setSelectedClass,
  classNameData,
  onSubmit,

  handleChangeGender,
}: FormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: {
      exercises: [{ title: 'Topshiriq 1', score: '', width: 14 }],
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
                    <TextField {...params} label='CHSB yoki BSB ni kiriting' />
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
                  value={field.value ? String(field.value) : ''}
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
              <FormControl fullWidth className='class'>
                <Autocomplete
                  {...field}
                  disablePortal
                  options={classNameData}
                  value={(field?.value as unknown as classType) || null}
                  onChange={(_, newValue: classType | null) => {
                    field.onChange(newValue);
                    setSelectedClass(
                      typeof newValue === 'string' ? newValue : '',
                    );
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label='Sinfni tanlang' />
                  )}
                />
              </FormControl>
            )}
          />

          <Controller
            name='gender'
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth className='class'>
                <Autocomplete
                  {...field}
                  disablePortal
                  options={Genders}
                  value={field.value ? String(field.value) : ''}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                    handleChangeGender(newValue || '');
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label='Jinsini tanlang' />
                  )}
                />
              </FormControl>
            )}
          />
        </Stack>
        <Controller
          name='totalScore'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl fullWidth className='count-of-students'>
              <TextField
                label='Jami ballni kiriting...'
                type='number'
                {...field}
                required
                error={!!errors[field.name]}
              />
            </FormControl>
          )}
        />
        <Accordion
          sx={{
            boxShadow: 'none',
            '&.MuiAccordion-root:before': { display: 'none' },
          }}
          style={{
            borderRadius: 6,
            border: '1px solid #C4C4C4',
          }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <img src={assignment} alt='icon' width={28} height={28} />
            <Typography ml={1}>Topshiriqlarni qo'shish</Typography>
          </AccordionSummary>

          <AccordionDetails>
            {fields.map((item, index) => (
              <Stack key={item.id} flexDirection='row' gap={1} mb={2}>
                <Stack style={{ width: '100%' }}>
                  <Controller
                    name={`exercises.${index}.score`}
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <TextField
                        label={`Topshiriq ${index + 1}`}
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
                <Stack mt={1.1}>
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
                    width: 14,
                  })
                }
              >
                Yana topshiriq qo'shish
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
